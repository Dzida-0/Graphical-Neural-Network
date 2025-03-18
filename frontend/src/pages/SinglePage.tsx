import { NetworkProvider } from "./../context/NetworkContext";
import  DragDropNN  from "./../components/DragDropNN";
import { PlotDataProvider } from "./../context/PlotDataContext";
import Plot from "./../components/Plot";
import SlidersNN from "./../components/SlidersNN";
import TrainingController from "./../components/TrainingController";
import Collapsible from "./../components/Collapsible";


interface SinglePageInterface {
    id: number;
}

export default function SinglePage({ id }: SinglePageInterface) {
    return (
        <div>
            <p>This is the content of page {id}.</p>
            <NetworkProvider pageId={id}>
                <PlotDataProvider pageId={id}>
                    <Collapsible title="Network">
                        <DragDropNN />
                    </Collapsible>
                    
                    <Collapsible title="Sliders">
                        <SlidersNN />
                    </Collapsible>
                    <Plot />
                    <TrainingController />
                </PlotDataProvider>
            </NetworkProvider>
        </div>
    );
}
