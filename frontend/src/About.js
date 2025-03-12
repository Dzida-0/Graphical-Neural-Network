import { NNProvider } from "./test/NNData";
import SliderManager from "./test/SliderManager";
import { DragDropNN } from "./test/DragDropNN";

export default function PageSimpleNNa() {
    return (
        <NNProvider>
            <DragDropNN />
            <SliderManager />
        </NNProvider>
    );
}
