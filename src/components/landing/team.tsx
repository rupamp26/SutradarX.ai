import Image from "next/image";
import { MotionDiv } from "./motion-div";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "team-1.png",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    image: "team-2.png",
  },
  {
    name: "John Smith",
    role: "COO",
    image: "team-3.png",
  },
  {
    name: "Jane Smith",
    role: "CFO",
    image: "team-4.png",
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">Meet our team</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
            We have a team of dedicated professionals who are passionate about
            what they do.
          </p>
        </MotionDiv>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <MotionDiv
              key={index}
              delay={0.2 + index * 0.1}
              className="flex flex-col items-center gap-4"
            >
              <Image
                src="https://placehold.co/300x300.png"
                alt={member.name}
                width={300}
                height={300}
                className="rounded-xl"
                data-ai-hint="team member portrait"
              />
              <div className="flex flex-col items-center">
                <h4 className="text-2xl">{member.name}</h4>
                <p className="text-lg text-muted-foreground">{member.role}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
