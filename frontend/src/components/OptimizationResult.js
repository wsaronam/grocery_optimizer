

function OptimizationResult({result}) {
    if (!result) return null;

    const {cheapestStore, stores} = result;


    return (
        <div>
            <h3>Best Store</h3>
            <div>
                <span>{cheapestStore.toUpperCase()}</span>
                <span>${stores[cheapestStore].total.toFixed(2)}</span>
            </div>

            <h4>Store Comparisons</h4>
            <ul>
                {Object.entries(stores).map(([store, data]) => (
                    // <li key={store}>
                    <li>
                        {/* <span>{store}</span> */}
                        <span>${data.total.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default OptimizationResult;