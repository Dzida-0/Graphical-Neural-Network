import { NetworkProvider } from "./../context/NetworkContext";
import { DragDropNN } from "./../components/DragDropNN";
import { PlotDataProvider } from "./../context/PlotDataContext";


interface SinglePageInterface {
    id: number;
}

export default function SinglePage({ id }: SinglePageInterface) {
    return (
        <div>
            <p>This is the content of page {id}.</p>
            <NetworkProvider pageId={id}>
                <DragDropNN />
                <PlotDataProvider pageId={id}>
                    
                </PlotDataProvider>
            </NetworkProvider>
        </div>
    );
}
