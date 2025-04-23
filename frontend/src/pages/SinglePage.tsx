import { NetworkProvider } from "../context/NetworkContext";
import  DragDropNN  from "./../components/DragDropNN";
import { PlotDataProvider } from "./../context/PlotDataContext";
import Plot from "./../components/Plot";
import SlidersNN from "./../components/SlidersNN";
import Collapsible from "./../components/Collapsible";  
import PlotDragDropTree from "../components/PlotDragDropTree";


export default function SinglePage({ id }: { id: number }) {
    return (
        <div>
            <NetworkProvider pageId={id}>
                <PlotDataProvider pageId={id}>
                    <div className="flex flex-col gap-4">
                    <Collapsible title="Network">
                        <DragDropNN />
                    </Collapsible>
                    
                    <Collapsible title="Sliders">
                        <SlidersNN />
                    </Collapsible>
                        <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-4 gap-4 bg-white w-full h-full">

                            <div className="flex-1 flex items-center justify-center">
                                <div className="aspect-square w-full max-w-full">
                                    <Plot />
                                </div>
                            </div>

                            <div className="w-1/2 flex flex-col justify-center">
                                <PlotDragDropTree />
                            </div>
                        </div>



                    
                    </div>
                </PlotDataProvider>
            </NetworkProvider>
        </div>
    );
}
