import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

function Calender() {

    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="w-full ">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=""
            />
        </div>

    )

}

export default Calender