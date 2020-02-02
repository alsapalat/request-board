const request = require('request');
const _ = require('lodash');

const index = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.CHATBOT_VERIFY_TOKEN) {
      console.log('WEBHOOK VERIFIED!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(404).json({});
  }
};

let reply_listener = {};
let conversation_payload = {}

const handleInquiries = (sid, body) => {
  const inquery_type = _.get(reply_listener, `${sid}.type`);
  if (inquery_type === 'REQUEST_REMARKS') {
    delete reply_listener[sid];
    console.log(body);
    conversation_payload[sid] = {
      ...conversation_payload[sid] || {},
      remarks: body.text,
    };
    console.log('ADD REQUEST QUEUE', conversation_payload[sid]);
    require('../index').socketServer.broadcast({
      type: 'REQUEST_POSTED',
      payload: conversation_payload[sid]
    });
    return;
  }
  console.log('unhandled inquire', inquery_type);
}

const handleMessage = (sid, body) => {
  const quick_reply_type = _.get(body, 'quick_reply.payload');
  if (quick_reply_type === 'SET_BUILDING') {
    conversation_payload[sid] = {
      ...conversation_payload[sid] || {},
      building: body.text,
    };
    sendMessage(sid, {
      text: 'Please select floor/room',
      quick_replies: [
        {
          content_type: 'text',
          title: 'R&D',
          payload: 'SET_ROOM',
        }, {
          content_type: 'text',
          title: '2th Floor(CHURCH)',
          payload: 'SET_ROOM',
        }, {
          content_type: 'text',
          title: '5th Floor(GYM)',
          payload: 'SET_ROOM',
        }
      ]
    });
    return;
  }
  if (quick_reply_type === 'SET_ROOM') {
    conversation_payload[sid] = {
      ...conversation_payload[sid] || {},
      room: body.text,
    };
    sendMessage(sid, {
      text: 'Please enter remarks',
    });
    reply_listener[sid] = {
      type: 'REQUEST_REMARKS'
    };
    return;
  }
  if (reply_listener[sid]) {
    handleInquiries(sid, body);
    return;
  }
  console.log('unhandled message', body);
}

const sendMessage = (sid, message) => {
  const payload = {
    recipient: {
      id: sid,
    },
    message,
  };
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.CHATBOT_ACCESS_TOKEN,
    },
    method: 'POST',
    json: payload,
  }, (err) => {
    if (!err) {
      console.log(`<${sid}> Respose Sent!`);
    } else {
      console.log(err);
    }
  });
};

const handlePostBack = (sid, body) => {
  if (body.payload === 'REQUEST_WATER') {
    conversation_payload[sid] = {
      action: 'REQUEST_WATER',
    };
    sendMessage(sid, {
      text: 'Please select Building',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Building A(old)',
          payload: 'SET_BUILDING',
        }, {
          content_type: 'text',
          title: 'Building B(new)',
          payload: 'SET_BUILDING',
        }
      ]
    });
    return;
  }
  console.log('unhandled postback', body);
}

const message = (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const e = entry.messaging[0];
      const sender_psid = e.sender.id;
      console.log(`<${sender_psid}>`);
      if (e.message) {
        handleMessage(sender_psid, e.message);
      }
      if (e.postback) {
        handlePostBack(sender_psid, e.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  index,
  message,
};
