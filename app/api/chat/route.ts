import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, context, projectData = {} } = await req.json();

        // Define personality based on the dashboard context
        const persona = context === "Investor Advisor"
            ? "You are an expert Venture Capital advisor for the NeuroGrowth platform. Use the provided portfolio and deal pipeline data to give financial advice."
            : "You are an expert Marketing AI for the NeuroGrowth platform. Use the provided content plan and campaign data to give marketing advice.";

        const systemPrompt = `
      ${persona}
      
      Here is the live data for this user's account:
      ${JSON.stringify(projectData)}
      
      Answer the user's question accurately based ONLY on the data above. Keep responses short, professional, and helpful.
    `;

        // Send to local Ollama
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                stream: false
            }),
        });

        if (!response.ok) throw new Error("Failed to reach Ollama");

        const data = await response.json();
        return NextResponse.json({ reply: data.message.content });

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: 'Failed to connect to local AI' }, { status: 500 });
    }
}