"use server"

export async function scrapeUrl(url: string) {
    try {
        const response = await fetch(`https://r.jina.ai/${url}`, {
            headers: {
                'Accept': 'application/json',
            }
        });

        if(!response.ok){
            throw new Error("Failed to scrape URL");
        }

        const data = await response.json();
        
        return { success: true, text: data.data.content };
    } catch (error) {
        return { success: false, error: "Failed to scrape URL" };
    }
}