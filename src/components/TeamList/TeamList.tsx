import { ourTeam } from '@/utils/ourTeam';
import Image from 'next/image';
import TeamListStyles from './TeamListStyles.module.scss';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import githubIcon from '../../assets/svg/github-icon.svg';

interface MemberAccordionProps {
  title: string;
  items: string[];
}

export function TeamList() {
  return (
    <div className={TeamListStyles['team-container']}>
      {ourTeam.map((member) => (
        <div key={member.name} className={TeamListStyles['member-container']}>
          <div className={TeamListStyles['member-container__info']}>
            <p>{member.name}</p>
            <Image
              className={TeamListStyles['member-container__img']}
              src={member.img}
              alt="member"
              width={300}
              height={300}
              priority
            />
            <p>{member.role}</p>
            <p>{member.description}</p>
          </div>
          <div className={TeamListStyles['accordions-container']}>
            <MemberAccordion title="Contributions" items={member.contributions} />
            <MemberAccordion title="Education" items={member.education} />
            <MemberAccordion title="Work" items={member.work} />
            <MemberAccordion title="Languages" items={member.languages} />
          </div>

          <a className={TeamListStyles['accordions-container__link']} href={`${member.github}`} target="_blank">
            <Image src={githubIcon} alt="github-logo" />
            {member.github.slice(member.github.lastIndexOf('/') + 1).toLowerCase()}
          </a>
        </div>
      ))}
    </div>
  );
}

function MemberAccordion({ title, items }: MemberAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion
        sx={{ backgroundColor: '#021e40', color: '#d4edff', borderRadius: '5px', fontFamily: "'Poppins', sans-serif" }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ color: '#d4edff' }} />}
          aria-controls={`${title}-content`}
          id={`${title}-header`}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {items.map((item: string, index: number) => (
            <Typography key={index}>
              <li>{item}</li>
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
