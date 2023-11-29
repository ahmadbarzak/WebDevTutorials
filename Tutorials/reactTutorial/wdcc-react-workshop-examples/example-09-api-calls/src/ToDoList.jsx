import styles from './ToDoList.module.css';

/**
 * Renders a list of ToDoItem components - one for each item in the given list.
 * 
 * When one of those items changes, this component's onTodoStatusChanged event will fire, supplying the
 * index of the changed item and the new completed status.
 * 
 * When the remove button on one of those items is clicked, this component's onRemove event will fire,
 * supplying the index of the item to be removed.
 */
export default function ToDoList({ items, onTodoStatusChanged, onRemove }) {

    if (items && items.length > 0) {
        return items.map((todo, index) =>
            <ToDoItem key={index}
                todo={todo}
                onChange={e => onTodoStatusChanged(todo, e.target.checked)}
                onRemove={() => onRemove(todo.id)} />);
    }
    else {
        return (
            <p>There are no to-do items!</p>
        );
    }
}

/**
 * Renders a single to-do item as a checkbox, which will be checked / unchecked based on that item's isComplete status.
 * Additionally renders the message "Done!", if the to-do is complete. When the to-do item is clicked, its "onChange" event
 * will fire. Also renders a "remove" button which, when clicked, will fire the "onRemove" event.
 */
function ToDoItem({ todo, onChange, onRemove }) {
    return (
        <div className={styles.todo}>
            <label className={todo.isComplete ? styles.done : undefined}>
                <input type="checkbox"
                    checked={todo.isComplete}
                    onChange={onChange} />
                {todo.description}
                {todo.isComplete && <span> (Done!)</span>}
            </label>
            <button onClick={onRemove}>Remove</button>
        </div>
    );
}