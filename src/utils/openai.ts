import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // ブラウザでの実行を許可
});

export const generateResponse = async (message: string): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 1000,  // トークン数を増やす
      temperature: 0.7,
      presence_penalty: 0.6,  // 応答の多様性を高める
      frequency_penalty: 0.5  // 単語の繰り返しを抑制
    });

    // 改行を保持したままレスポンスを返す
    return completion.choices[0].message.content?.replace(/\\n/g, '\n');
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return null;
  }
};