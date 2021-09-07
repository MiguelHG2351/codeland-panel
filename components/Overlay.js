import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
    const [mountend, setMountend] = useState(false);

    useEffect(() => {
        setMountend(true)
        return () => setMountend(false)
    }, [])

    return mountend && createPortal(children, document.body.querySelector('#overlay'))

}

export default Portal;
