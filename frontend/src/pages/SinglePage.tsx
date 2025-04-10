import { NetworkProvider } from "./../context/NetworkContext";
import  DragDropNN  from "./../components/DragDropNN";
import { PlotDataProvider } from "./../context/PlotDataContext";
import Plot from "./../components/Plot";
import SlidersNN from "./../components/SlidersNN";
import TrainingController from "./../components/TrainingController";
import Collapsible from "./../components/Collapsible";  
import PlotDragDropTree from "../components/PlotDragDropTree";

interface SinglePageInterface {
    id: number;
}

export default function SinglePage({ id }: SinglePageInterface) {
    return (
        <div>
            <NetworkProvider pageId={id}>
                <PlotDataProvider pageId={id}>

                    <Collapsible title="Network">
                        <DragDropNN />
                    </Collapsible>
                    
                    <Collapsible title="Sliders">
                        <SlidersNN />
                    </Collapsible>
                    <div className="flex m-10">
                    <Plot />
                    <PlotDragDropTree />
                    </div>
                    <TrainingController />

                </PlotDataProvider>
            </NetworkProvider>
        </div>
    );
}
