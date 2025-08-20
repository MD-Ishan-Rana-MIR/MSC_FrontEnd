import TeamCard from '@/components/website/team/TeamCard'
import React from 'react'

const Team = () => {
    const teamData = [
        {
            image: "/images/about/team/team-1.png",
            name: "John Smith",
            profession: "Software Engineer",
            facebookLink: "https://facebook.com/johnsmith",
            twitterLink: "https://twitter.com/johnsmith",
            instagram: "https://instagram.com/johnsmith",
        },
        {
            image: "/images/about/team/team-2.png",
            name: "Emily Johnson",
            profession: "UI/UX Designer",
            facebookLink: "https://facebook.com/emilyjohnson",
            twitterLink: "https://twitter.com/emilyjohnson",
            instagram: "https://instagram.com/emilyjohnson",
        },
        {
            image: "/images/about/team/team-3.png",
            name: "Michael Brown",
            profession: "Digital Marketer",
            facebookLink: "https://facebook.com/michaelbrown",
            twitterLink: "https://twitter.com/michaelbrown",
            instagram: "https://instagram.com/michaelbrown",
        },
    ];
    return (
        <div>
            <div className=' max-w-6xl mx-auto lg:my-20 my-10 ' >
                <div>
                    <h1 className=' text-[#252B42] text-center font-bold lg:text-[40px] text-2xl '>Meet Our Team</h1>
                    <p className=' text-center text-[#737373] font-normal text-xs lg:text-sm  '  >Problems trying to resolve the conflict between <br />
                        the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:mt-20 mt-10 max-w-6xl  mx-auto ">
                        {teamData.map((person, index) => (
                            <TeamCard person={person} index={index}  ></TeamCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team