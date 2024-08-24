import Image from 'next/image';
import TeamListStyles from './TeamListStyles.module.scss';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import githubIcon from '../../assets/svg/github-icon.svg';
import { useTranslations } from 'next-intl';
import leraImg from '../../assets/lera-img.jpg';
import mishaImg from '../../assets/misha-img.jpg';
import vikaImg from '../../assets/vika-img.jpg';
import { splitString } from '@/utils/fgdfg';

interface MemberAccordionProps {
  title: string;
  items: string[];
}

export function TeamList() {
  const t = useTranslations('WelcomePage');

  const infoMembers = [
    {
      name: t('memberNameMikhail'),
      img: mishaImg,
      role: t('memberRoleMikhail'),
      description: t('memberDescriptionMikhail'),
      contributions: splitString(t('memberContributionsMikhail')),
      education: splitString(t('memberEducationMikhail')),
      work: splitString(t('memberWorkMikhail')),
      languages: splitString(t('memberLanguagesMikhail')),
      github: 'https://github.com/MikhailSemenuk',
    },
    {
      name: t('memberNameValerie'),
      img: leraImg,
      role: t('memberRoleValerie'),
      description: t('memberDescriptionValerie'),
      contributions: splitString(t('memberContributionsValerie')),
      education: splitString(t('memberEducationValerie')),
      work: splitString(t('memberWorkValerie')),
      languages: splitString(t('memberLanguagesValerie')),
      github: 'https://github.com/Valeria110',
    },
    {
      name: t('memberNameViktoriya'),
      img: vikaImg,
      role: t('memberRoleViktoriya'),
      description: t('memberDescriptionViktoriya'),
      contributions: splitString(t('memberContributionsViktoriya')),
      education: splitString(t('memberEducationViktoriya')),
      work: splitString(t('memberWorkViktoriya')),
      languages: splitString(t('memberLanguagesViktoriya')),
      github: 'https://github.com/qwgfsehte',
    },
  ];

  return (
    <div className={TeamListStyles['team-container']}>
      {infoMembers.map((member) => (
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
            <p className={TeamListStyles['member-container__role']}>{member.role}</p>
            <p>{member.description}</p>
          </div>
          <div className={TeamListStyles['accordions-container']}>
            <MemberAccordion title={t('contributionsTitle')} items={member.contributions} />
            <MemberAccordion title={t('educationTitle')} items={member.education} />
            <MemberAccordion title={t('workTitle')} items={member.work} />
            <MemberAccordion title={t('languagesTitle')} items={member.languages} />
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
        sx={{ backgroundColor: '#0D47A1', color: '#d4edff', borderRadius: '5px', fontFamily: "'Poppins', sans-serif" }}
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
