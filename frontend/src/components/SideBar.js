export default function SideBar({items}) {
    return (
        <div>
            <h1>Your Grocery List</h1>

            {items.length === 0 && (<p>Grocery list is empty.</p>)}

            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}