const { useState } = React


export function HomePage() {
    // const dispatch = useDispatch()
    // const [count, setCount] = useState(10)
    // const count = useSelector(storeState => storeState.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        // dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section>
            <h2>
                Our project
            </h2 >
        </section >
    )
}