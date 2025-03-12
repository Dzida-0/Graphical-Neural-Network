import { NNProvider } from "./NNData";
import SliderManager from "./SliderManager";
import { DragDropNN } from "./DragDropNN";

export default function PageSimpleNN() {
    return (
        <NNProvider>
            <DragDropNN />
            <SliderManager />
        </NNProvider>
    );
}
