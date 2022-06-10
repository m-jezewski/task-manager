import ReactDOM from 'react-dom'

interface TitleProps {
    children: string
}

const Title = ({ children }: TitleProps) => {
    const mainTitle = document.getElementById('main-title')

    return (
        <>
            {mainTitle && ReactDOM.createPortal(
                <>{children}</>
                , mainTitle)}
        </>
    )
}

export default Title;