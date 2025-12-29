import { useState, useEffect } from "react";

// custom hook for fetching content and metadata for projects/blogs
// returns data, metadata, loading, error
export default function useContent<T>(url: string, metadataUrl: string) {
    const [data, setData] = useState<string>("");
    const [metadata, setMetadata] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data: string = await response.text();
                setData(data);
            } catch (error) {
                setError("Failed to fetch data");
                console.error("Failed to fetch data:", error);
            }

            try {
                const response = await fetch(metadataUrl);
                if (!response.ok) throw new Error("Failed to fetch metadata");
                const metadata = await response.json();
                setMetadata(metadata);
            } catch (error) {
                setError("Failed to fetch metadata");
                console.error("Failed to fetch metadata:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, metadataUrl]);

    return { data, metadata, loading, error };
}