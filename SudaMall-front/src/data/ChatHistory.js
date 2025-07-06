import { user1, user3 } from "../assets/demo_data"

export const ChatHistory = {
  "chat_between": {
    "owner": {
      "id": 1,
      "name": "مالك المتجر",
      "image_url": user1,
      "online": true,
      "last_seen": "2025-06-07T10:00:00Z",
    },
    "customer": {
      "id": 2,
      "name": "أحمد يوسف",
      "image_url": user3,
      "online": true,
      "last_seen": "2025-06-07T10:00:00Z",
    }
  },
 "messages": [
  {
    "message_id": 1001,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "أهلاً، كيف يمكنني مساعدتك اليوم؟",
    "timestamp": "2025-06-07T10:00:00Z",
    "is_received": true,
    "is_read": true
  },
  {
    "message_id": 1002,
    "sender_id": 2,
    "receiver_id": 1,
    "message": "مرحبا! لدي استفسار بخصوص أحد المنتجات الموجودة في المتجر.",
    "timestamp": "2025-06-07T10:01:00Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1003,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "بالطبع",
    "timestamp": "2025-06-07T10:02:30Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1003,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "أخبرني ما هو المنتج الذي ترغب في معرفة المزيد عنه.",
    "timestamp": "2025-06-07T10:02:30Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1004,
    "sender_id": 2,
    "receiver_id": 1,
    "message": "المنتج هو الهاتف الذكي موديل X100،",
    "timestamp": "2025-06-07T06:03:15Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1004,
    "sender_id": 2,
    "receiver_id": 1,
    "message": " هل هو متوفر حالياً؟",
    "timestamp": "2025-06-07T10:03:15Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1005,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "نعم، المنتج متوفر حالياً بعدد محدود. يُنصح بطلبه في أقرب وقت ممكن لتفادي نفاد الكمية.",
    "timestamp": "2025-06-07T10:04:00Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1006,
    "sender_id": 2,
    "receiver_id": 1,
    "message": "جميل جداً، هل يمكنك أيضاً توضيح فترة الضمان وهل يشمل عيوب التصنيع فقط؟",
    "timestamp": "2025-06-07T10:05:45Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1007,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "الضمان لمدة عام كامل، ويشمل عيوب التصنيع فقط ولا يشمل الأضرار الناتجة عن سوء الاستخدام أو الكسر.",
    "timestamp": "2025-06-07T10:07:00Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1008,
    "sender_id": 2,
    "receiver_id": 1,
    "message": "تمام، شكراً لك على التوضيح. سأقوم بإجراء الطلب اليوم إن شاء الله.",
    "timestamp": "2025-06-07T10:08:20Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1009,
    "sender_id": 1,
    "receiver_id": 2,
    "message": "يسعدنا ذلك. لا تتردد في التواصل معنا إذا كنت بحاجة لأي مساعدة إضافية.",
    "timestamp": "2025-06-07T10:09:10Z",
    "is_received": true,
    "is_read": false
  },
  {
    "message_id": 1010,
    "sender_id": 2,
    "receiver_id": 1,
    "message": "شكراً جزيلاً، تحياتي لك.",
    "timestamp": "2025-06-07T10:10:00Z",
    "is_received": true,
    "is_read": false
  }
]

}
