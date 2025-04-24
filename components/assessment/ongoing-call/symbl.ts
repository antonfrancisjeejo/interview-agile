/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const APP_ID =
  "314349553065484c34344b52435a4c536b5a4b6b6d474b4b396f6d615848424b";
const APP_SECRET =
  "4469376f6a52585a72676a6c45394c43576550616e784f54367461575254464c3541506a7a4f33736d46617a4a435a4b4478545a387a6b586c566456774a4850";
const BASE_API_URL = "https://api.symbl.ai";

// Sample text conversation (replace with your actual conversation)
const TEXT_CONVERSATION = [
  {
    role: "Seller",
    text: "Hi there! Thanks for chatting with me today! I’m excited to talk to you about our caps. May I know what brought you here?",
  },
  {
    role: "Buyer",
    text: "Hi! No problem at all. I’m just browsing for a good cap. I’ve been needing one for a while now.",
  },
  {
    role: "Seller",
    text: "That’s great to hear! I’d love to help you find the perfect one. What are your main needs when it comes to a cap?",
  },
  {
    role: "Buyer",
    text: "Well, it needs to be comfortable, durable, and honestly, I’d like it to look stylish too. Oh, and it shouldn’t break the bank!",
  },
  {
    role: "Seller",
    text: "You’ve come to the right place! Our caps check all those boxes. They’re made from high-quality, breathable cotton that’s super comfortable for all-day wear. The stitching is reinforced, so they’re built to last through whatever you throw at them—whether it’s daily use or outdoor adventures. And style? We’ve got a sleek, modern design that comes in a bunch of colors—black, navy, olive, even a cool charcoal gray. What kind of style are you leaning toward?",
  },
  {
    role: "Buyer",
    text: "Oh, that sounds promising! I like the sound of navy or charcoal gray. Do they have any special features? I’m curious what sets them apart.",
  },
  {
    role: "Seller",
    text: "Absolutely, I’m glad you asked! These caps have a few standout features. They’ve got an adjustable strap at the back for a perfect fit, plus a moisture-wicking sweatband inside to keep you cool and dry—perfect for sunny days or workouts. The fabric is also fade-resistant, so that navy or charcoal gray will stay vibrant even after lots of wear. Honestly, it’s a cap that’s as functional as it is good-looking!",
  },
  {
    role: "Buyer",
    text: "Wow, I like that! The moisture-wicking thing sounds really useful. How much do they cost?",
  },
  {
    role: "Seller",
    text: "I’m happy you like it! The regular price is $25, which is already a steal for the quality. But since you’re here today, I can offer you a special discount—how does $20 sound? We’re running a little promotion to thank our customers, and I’d love for you to take advantage of it!",
  },
  {
    role: "Buyer",
    text: "Only $20? That’s pretty tempting! Is it easy to clean? I tend to get things dirty sometimes.",
  },
  {
    role: "Seller",
    text: "No worries at all! Yes, it’s super easy to clean. You can just toss it in the washing machine on a gentle cycle with cold water, then air dry it. It’ll come out looking as good as new. We’ve designed it to be low-maintenance so you can enjoy it without the hassle!",
  },
  { role: "Buyer", text: "Nice! How soon could I get it if I order one?" },
  {
    role: "Seller",
    text: "Great question! If you order today, we can ship it out tomorrow morning. With standard shipping, it’ll arrive at your door within 3-5 business days. We also offer expedited shipping if you’d like it even sooner—just let me know what works best for you!",
  },
  {
    role: "Buyer",
    text: "That’s fast! I think standard shipping is fine. Hmm, I’m really liking the charcoal gray one. Does it come in different sizes, or is it just the adjustable strap?",
  },
  {
    role: "Seller",
    text: "I’m thrilled you’re leaning toward the charcoal gray—it’s one of our most popular colors! It’s a one-size-fits-most design with the adjustable strap, so it fits a wide range of head sizes comfortably. The strap gives you full control to tweak it just the way you like it!",
  },
  {
    role: "Buyer",
    text: "Perfect. I think I’m sold! How do I go about ordering it?",
  },
  {
    role: "Seller",
    text: "Fantastic! I’m so glad to hear that! Ordering is super easy. I can send you a quick link to our secure checkout page—just let me know your email or phone number, and I’ll get that over to you. You’ll select the charcoal gray, apply the $20 discount code I’ll include, and you’re all set! Does that sound good?",
  },
  {
    role: "Buyer",
    text: "Yeah, that sounds great! You can send it to my email: buyer@example.com.",
  },
  {
    role: "Seller",
    text: "Perfect! I’ve just sent the link to buyer@example.com with the discount code included. You should see it in your inbox any moment now. Once you complete the order, I’ll make sure it’s prioritized for tomorrow’s shipment. Thanks so much for choosing us—I know you’re going to love this cap!",
  },
  {
    role: "Buyer",
    text: "Awesome, I just got the email. I’ll place the order now. Thanks for all the help—you’ve been great!",
  },
  {
    role: "Seller",
    text: "My pleasure! Thank you for your order and for chatting with me today. If you ever need anything else—or just want to tell me how much you love the cap—feel free to reach out. Enjoy, and have a wonderful day!",
  },
];

// Interface for feedback structure
interface SellerFeedback {
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  actionItems: string[];
  sentimentScore: number;
}

// Authenticate and get access token
async function getAccessToken(): Promise<string> {
  const response = await axios.post(`${BASE_API_URL}/oauth2/token:generate`, {
    type: "application",
    appId: APP_ID,
    appSecret: APP_SECRET,
  });
  return response.data.accessToken;
}

// Main function to analyze text conversation and generate feedback
export async function analyzeTextConversation(): Promise<SellerFeedback> {
  try {
    // Get access token
    const accessToken = await getAccessToken();
    console.log("Access token obtained.");

    // Format messages for submission with both name and userId
    const messages = TEXT_CONVERSATION.map((msg, index) => ({
      payload: { content: msg.text },
      from: {
        name: msg.role,
        userId: msg.role === "Seller" ? "seller-001" : "buyer-001",
      },
    }));

    const messages2 = [{ payload: { content: TEXT_CONVERSATION } }];

    // Submit text conversation
    const submitResponse = await axios.post(
      `${BASE_API_URL}/v1/process/text`,

      {
        // payload: { content: textone },
        name: "Seller-Buyer Text Conversation",
        messages,
        // insightTypes: ["action_item", "question", "follow_up"],
        // confidenceThreshold: 0.7,
        // languageCode: "en-US",
        enableSummary: true,
        detectEntities: true,
        detectPhrases: true,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const conversationId = submitResponse.data.conversationId;
    console.log(`Conversation ID: ${conversationId}`);

    // Fetch conversation data
    const conversationDataResponse = await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const conversationData = conversationDataResponse.data;
    console.log("Conversation data:", conversationData);
    // Fetch insights
    const insightsResponse = await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/insights`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const insights = insightsResponse.data.insights || [];

    // Fetch sentiment
    const sentimentResponse = await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/analytics`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const sentiment = sentimentResponse.data.sentiment || [];

    // Fetch follow-ups
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/follow-ups`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    // Fetch messages
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/messages`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    // Fetch summary
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/summary`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    // Fetch callscore
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/callscore`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    // topics
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/topics`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // questions
    await axios.get(
      `${BASE_API_URL}/v1/conversations/${conversationId}/questions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Generate feedback
    const feedback: SellerFeedback = {
      summary: "",
      strengths: [],
      areasForImprovement: [],
      actionItems: [],
      sentimentScore: 0,
    };

    // Generate summary from messages
    feedback.summary = conversationData.messages
      .map((msg: any) => `${msg.from?.name || "Unknown"}: ${msg.text}`)
      .join("\n");

    // Extract action items
    feedback.actionItems = insights
      .filter((insight: any) => insight.type === "action_item")
      .map((insight: any) => insight.text);

    // Analyze sentiment
    const sentimentScores = sentiment.map((s: any) => s.polarity?.score || 0);
    feedback.sentimentScore =
      sentimentScores.length > 0
        ? sentimentScores.reduce((a: number, b: number) => a + b, 0) /
          sentimentScores.length
        : 0;

    // Provide feedback based on insights and sentiment
    if (feedback.sentimentScore > 0.3) {
      feedback.strengths.push("Maintained a positive and professional tone.");
    } else if (feedback.sentimentScore < -0.3) {
      feedback.areasForImprovement.push(
        "The tone seemed negative; focus on positivity to build rapport."
      );
    }

    const questions = insights.filter(
      (insight: any) => insight.type === "question"
    );
    if (questions.length > 0) {
      feedback.strengths.push(
        `Asked ${questions.length} questions, showing good engagement.`
      );
    } else {
      feedback.areasForImprovement.push(
        "Ask more questions to uncover the buyer’s needs and build trust."
      );
    }

    if (feedback.actionItems.length === 0) {
      feedback.areasForImprovement.push(
        "No clear action items assigned; suggest next steps to close the sale."
      );
    } else {
      feedback.strengths.push(
        "Assigned clear action items to move the conversation forward."
      );
    }

    // Additional sales-specific feedback
    const buyerNeedsMentioned = TEXT_CONVERSATION.some((msg) =>
      msg.text.toLowerCase().includes("need")
    );
    if (!buyerNeedsMentioned) {
      feedback.areasForImprovement.push(
        "Did not explicitly address or confirm the buyer’s needs; clarify them next time."
      );
    }

    return feedback;
  } catch (error) {
    console.error(
      "Error analyzing conversation:",
      (error as any).response?.data || error
    );
    throw error;
  }
}
