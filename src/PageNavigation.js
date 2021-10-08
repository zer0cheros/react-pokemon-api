import React from 'react'

export default function PageNavigation({gotonext, gotoprev}) {
    return (
        <div>
            {gotonext && <button onClick={gotonext}>Next Page</button>}
            {gotoprev && <button onClick={gotoprev}>Previous Page</button>}
        </div>
    )
}
