import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoToTop() {
    const pathName: string = useLocation().pathname;
    
    const onTop = (x: number, y: number) => {
        window.scrollTo(x, y);
    }
    
    useEffect(() => {
        onTop(0, 0)
    }, [pathName]);

    return null;
}

export default GoToTop;