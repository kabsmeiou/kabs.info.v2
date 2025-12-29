export const incrementCounter = async (type: string): Promise<number | null> => {
    try {
        const response = await fetch('/api/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, action: 'increment' }),
        });

        const data = await response.json();
        return data.value ?? null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getCounter = async (type: string): Promise<number | null> => {
    try {
        const response = await fetch(`/api/counter?type=${encodeURIComponent(type)}`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log('Fetched counter data:', data);
        return data.value ?? null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
