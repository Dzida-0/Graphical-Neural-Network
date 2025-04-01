import { NetworkProvider } from "./../context/NetworkContext";
import  DragDropNN  from "./../components/DragDropNN";
import { PlotDataProvider } from "./../context/PlotDataContext";
import Plot from "./../components/Plot";
import SlidersNN from "./../components/SlidersNN";
import TrainingController from "./../components/TrainingController";
import Collapsible from "./../components/Collapsible";
import PlotController  from "./../components/PlotController"

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
                    <PlotController />
                    </div>
                    <TrainingController />

                </PlotDataProvider>
            </NetworkProvider>
        </div>
    );
}
