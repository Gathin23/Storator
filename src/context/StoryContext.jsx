import { useContext,createContext, useState } from "react";

const StoryContext = createContext(undefined);

export const useStoryContext = () => {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error("useStoryContext must be used within a StoryProvider");
    }
    return context;
    };

export const StoryProvider = ({ children }) => {
    const [story, setStory] = useState("");
    return <StoryContext.Provider value={{
        story,
        setStory,
    }}>{children}</StoryContext.Provider>;
}