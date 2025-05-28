import { Calendar } from "@/components/ui/calendar"
import Rank from "./Rank"
import Notes from "./Notes"

const RankNotes=()=> {
    return (
        <div className="flex flex-col gap-5">
            <Rank/>
            <Calendar/>
            <Notes/>
        </div>
    )
}

export default RankNotes