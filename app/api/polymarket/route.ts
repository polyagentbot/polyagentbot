export async function GET() {
  try {
    const res = await fetch(
      "https://gamma-api.polymarket.com/markets?limit=5"
    );

    const data = await res.json();

    return Response.json({
      markets: data.map((m: any) => ({
        question: m.question,
        price: m.lastTradePrice,
      })),
    });
  } catch (err) {
    return Response.json({ error: "failed" });
  }
}

