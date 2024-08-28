import { DocsSectionProps } from '@/types/types';
import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { ArgType } from './return';
import { filterSchemaTypes, findKeyValue } from '@/utils/docsUtils';
import docsStyles from '../DocsStyles.module.scss';

interface NestedItemProps {
  name: string;
  description?: string;
  level: number;
  children?: React.ReactNode;
}

const NestedItem = ({ name, description, level, children }: NestedItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ paddingLeft: `${level * 15}px` }}>
        <ListItemText primary={name} />
        {open ? <ExpandMore /> : <KeyboardArrowRight />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {description && (
          <List component="div" disablePadding>
            <div>
              <ListItemText primary={description} />
            </div>
          </List>
        )}
        {children}
      </Collapse>
    </>
  );
};

export default function Queries({ schema }: DocsSectionProps) {
  const allQueries = filterSchemaTypes(schema, 'Query');

  return (
    allQueries && (
      <List component="nav">
        <NestedItem name="Queries" level={1}>
          <List component="div" disablePadding>
            {allQueries.fields.map((query) => (
              <NestedItem key={query.name} name={query.name} description={''} level={2}>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {query.description && (
                    <NestedItem key={query.description} name={'description'} description={''} level={2}>
                      <div key={query.description} className={docsStyles['args-container']}>
                        <div className={docsStyles['args-list']}>
                          <p>{query.description}</p>
                        </div>
                      </div>
                    </NestedItem>
                  )}
                  {query.args.length > 0 && (
                    <NestedItem key={query.args.length} name={'args'} description={''} level={2}>
                      {query.args &&
                        query.args.map((arg) => {
                          const argTypeName = findKeyValue(arg.type, 'name');
                          const argTypeDescription = argTypeName
                            ? filterSchemaTypes(schema, argTypeName)?.description
                            : null;

                          return (
                            <div key={arg.name} className={docsStyles['args-container']}>
                              <div className={docsStyles['args-list']}>
                                <ArgType type={arg.type} typeName={arg.name} />
                                {argTypeDescription && <div>{argTypeDescription}</div>}
                              </div>
                            </div>
                          );
                        })}
                    </NestedItem>
                  )}
                </List>
              </NestedItem>
            ))}
          </List>
        </NestedItem>
      </List>
    )
  );
}
