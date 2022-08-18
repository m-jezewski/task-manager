import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BooleanGoalStep, Goal, NumberGoalStep, TaskGoalStep } from "../../interfaces";
import styles from './GoalLink.module.scss'

interface GoalLinkProps {
    goal: Goal
    steps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]
}

const drawCircle = (color: string, percent: number, canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext('2d')
    canvas.width = canvas.height = 112
    ctx && ctx.translate(112 / 2, 112 / 2)
    ctx && ctx.rotate(-0.5 * Math.PI)
    percent = Math.min(Math.max(0, percent), 1)
    if (ctx) {
        ctx.beginPath()
        ctx.arc(0, 0, 53.5, 0, Math.PI * 2 * percent, false)
        ctx.strokeStyle = color
        ctx.lineCap = 'round'
        ctx.lineWidth = 5
        ctx.stroke()
    }
}

const GoalLink = ({ goal, steps }: GoalLinkProps) => {
    let sum = steps.map(step => step.progress).reduce((prev, current) => prev + current, 0)
    const goalProgress = (sum / steps.length * 100)
    const span = useRef<HTMLSpanElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvas.current) {
            drawCircle('#e5e7eb', 100 / 100, canvas.current);
            drawCircle('#86efac', goalProgress / 100, canvas.current);
        }
    }, [])

    return (
        <Link
            to={`${goal.id}`}
            key={goal.id}
            className={styles.link}>
            <h3>{goal.title}</h3>
            <div
                className={styles.goalProgressCircle}
                style={{}}>
                <span ref={span}>
                    {goalProgress.toFixed(0)}%
                </span>
                <canvas ref={canvas} />
            </div>
        </Link>
    );
}
export default GoalLink;
