import { useState, ChangeEvent, KeyboardEvent } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is requiered')
        }
        
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''} />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}