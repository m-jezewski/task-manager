import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BooleanGoalStep, Goal, NumberGoalStep, TaskGoalStep } from "../../interfaces";
import styles from './GoalLink.module.scss'

interface GoalLinkProps {
    goal: Goal
    steps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]
}

const drawCircle = (color: string, percent: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    percent = Math.min(Math.max(0, percent), 1)
    ctx.beginPath()
    ctx.arc(0, 0, 53.5, 0, Math.PI * 2 * percent, false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineWidth = 5
    ctx.stroke()
}

const GoalLink = ({ goal, steps }: GoalLinkProps) => {
    const goalProgress = steps.map(step => step.progress).reduce((prev, current) => prev + current, 0) / steps.length * 100
    const span = useRef<HTMLSpanElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext('2d')
            canvas.current.width = canvas.current.height = 112
            if (ctx) {
                ctx.translate(112 / 2, 112 / 2)
                ctx.rotate(-0.5 * Math.PI)
                drawCircle('#e5e7eb', 100 / 100, canvas.current, ctx);
                drawCircle('#86efac', goalProgress / 100, canvas.current, ctx);
            }
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
                    {goalProgress.toFixed()}%
                </span>
                <canvas ref={canvas} />
            </div>
        </Link>
    );
}
export default GoalLink;
