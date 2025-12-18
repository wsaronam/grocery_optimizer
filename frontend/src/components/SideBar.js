import "./styles/SideBar.css";




export default function SideBar({items}) {
    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Your Grocery List</h1>

            {items.length === 0 && (<p className="empty-message">Grocery list is empty.</p>)}

            <ul className="sidebar-main-list">
                {items.map((item, i) => (
                    <li key={i} className="sidebar-list-item">
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}