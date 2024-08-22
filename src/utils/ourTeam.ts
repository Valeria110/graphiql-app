import leraImg from '../assets/lera-img.jpg';
import mishaImg from '../assets/misha-img.jpg';
import vikaImg from '../assets/vika-img.jpg';

export const ourTeam = [
  {
    name: 'Mikhail Semenuk',
    img: mishaImg,
    description: `Mike is an incredibly intelligent and hardworking known for his outstanding self-organization and discipline. Mike also has a passion for automation, often writing small scripts to streamline tasks and make life easier. Additionally, he fosters a friendly and positive atmosphere within the team. Without a doubt, his contributions to our project are invaluable.`,
    role: 'Front-end developer',
    contributions: ['Created pages for an application (Sign In / Sign Up)', 'Clear feedback to PRs'],
    education: [
      'Brest State Technical University (2016)',
      'RS Schools Course «JavaScript/Front-end. Stage 0» 2023',
      'RS Schools Course «JavaScript/Front-end. Stage 1-2» 2024',
      'RS Schools Course «React. Stage 3» 2024',
    ],
    work: [
      '2023-2018 - Work in a leasing company, develop CRM и API for integrations, automate and simplify the work of employees.',
      '2018-2017 - 1C developer, Python + Odoo',
      '2016-2017 - System administrator, development and support of the - organization’s website, programmer.',
    ],
    languages: ['English - B2', 'Belarusian - native', 'Russian - native', 'Polish - B1'],
    github: 'https://github.com/MikhailSemenuk',
  },
  {
    name: 'Valerie Ivashkevich',
    img: leraImg,
    description: `Valerie is exceptionally self-disciplined, responsible, and creative, with a remarkable work ethic and a deep passion for web development. Throughout the project, she consistently showed a strong drive to create a unique and appealing application.Her contributions have been truly invaluable and crucial to the project's success.`,
    role: 'Team Lead & Front-end developer',
    contributions: [
      'Team organization',
      'Set the repository and task Kanban board',
      'Created pages for an application (GraphiQL route)',
      'Checking PRs and clear feedback',
    ],
    education: [
      'RS Schools Course «JavaScript/Front-end. Stage 1-2» 2024',
      'BSEU (the Faculty of International Business Communications) 2026',
      'The Web Developer Bootcamp 2023 from Colt Steele',
      'RS Schools Course «JavaScript/Front-end. Stage 0» 2023',
      'RS Schools Course «React. Stage 3» 2024',
    ],
    work: [
      'In the summer of 2022 she worked as an interpreter and translator at the company — oral and written translation from Russian into English and German, and vice versa, participation in tenders, participation in negotiations as an interpreter.',
      'Currently, Valerie is devoting all her free time to taking the RS school front-end course',
    ],
    languages: ['Russian/Belarusian - native', 'English - C1 advanced', 'German - B1', 'Chinese - A1 basic'],
    github: 'https://github.com/Valeria110',
  },
  {
    name: 'Viktoriya Rashchepkina',
    img: vikaImg,
    description: `Vika is exceptionally diligent and responsible, bringing a high level of quality and attention to every task she undertakes. Throughout the project, she gave her all to contribute to the development of our project. Vika is a fantastic and positive presence on our team!`,
    role: 'Front-end developer',
    contributions: [
      'Created pages for an application (Welcome page)',
      'Setup auth with Firebase',
      'Checking PRs and clear feedback',
    ],
    education: [
      'Medical college',
      'RS Schools Course «JavaScript/Front-end. Stage 1-2» 2024',
      'RS Schools Course «React. Stage 3» 2024',
    ],
    work: ['Currently, Vika is devoting all her free time to programming and taking the RS school front-end course'],
    languages: ['Russian - native', 'English - B1'],
    github: 'https://github.com/qwgfsehte',
  },
];
