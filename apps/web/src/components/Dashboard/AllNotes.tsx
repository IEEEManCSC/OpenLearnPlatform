import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, EllipsisVertical, Pencil, Trash } from "lucide-react"



function AllNotes() {
    const Fakenotes = [
        { topic: 'Topic 1 : intro to sql', date: '22/5/2024', note: 'consectetur adipiscing elit, sed do' },
        { topic: 'Topic 2 : intro to sql', date: '22/5/2024', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' },
        { topic: 'Topic 3 : intro to sql', date: '22/5/2024', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' },
        { topic: 'Topic 4 : intro to sql', date: '22/5/2024', note: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam dolores, ducimus incidunt autem minus consequatur voluptatibus veritatis amet in eos ipsam architecto. Numquam ducimus incidunt illo! Magnam doloremque ipsum recusandae!' },
        { topic: 'Topic 5 : intro to sql', date: '22/5/2024', note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere incidunt voluptas est placeat repudiandae nesciunt debitis cum similique expedita, vitae commodi fuga beatae nihil dolore rem nulla hic blanditiis excepturi delectus sit culpa cumque iste. Sequi sint dolores, eaque fuga quidem delectus corporis repellat hic ut, quis aspernatur aut quam?' },
    ]
    return (
        <>
            <div className="flex gap-8 my-5 ms-3">
                <div>
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <div className="flex gap-1 text-xl items-center cursor-pointer font-semibold"> <p>Level</p>  <ChevronDown /> </div>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem>Beginer</DropdownMenuItem>
                            <DropdownMenuItem>Intermidiate</DropdownMenuItem>
                            <DropdownMenuItem>Advanced</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <div className="flex gap-1 text-lg items-center cursor-pointer font-semibold"> <p>Sort by Name</p> <ChevronDown /> </div>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem>Sql</DropdownMenuItem>
                            <DropdownMenuItem>HTML</DropdownMenuItem>
                            <DropdownMenuItem>CSS</DropdownMenuItem>
                            <DropdownMenuItem>Js</DropdownMenuItem>
                            <DropdownMenuItem>React</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <div className="flex gap-1 text-lg items-center cursor-pointer font-semibold"> <p>Sort by Date</p> <ChevronDown /> </div>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem>Sort by Latest</DropdownMenuItem>
                            <DropdownMenuItem>Sort by Oldest</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {
                    Fakenotes.map((note, index) =>
                        <div key={index} className="flex flex-col gap-3 rounded-xl bg-white w-11/12 border-s-IEEEorange border-s-4 border-[1px] p-3">
                            <div className="flex flex-wrap justify-between">
                                <p className="text-secondary-gray text-lg font-semibold">{note.topic}</p>
                                <div className="text-zinc-400 flex gap-2">
                                    <p>{note.date}</p>
                                    <div>
                                        <DropdownMenu><DropdownMenuTrigger asChild>
                                            <EllipsisVertical className="cursor-pointer" />
                                        </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-16" align="start">
                                                <DropdownMenuItem className="flex gap-1 text-lg"><Pencil /> <p>Edit</p> </DropdownMenuItem>
                                                <DropdownMenuItem className="flex gap-1 text-lg text-red-600"><Trash color="red" /> <p>Delete</p></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                            <p className="text-secondary-gray text-ellipsis line-clamp-2">{note.note}...</p>
                        </div>
                    )
                }
            </div>
        </>

    )
}

export default AllNotes