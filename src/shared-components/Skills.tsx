import { Flex, Tag } from 'antd';
import { useState } from 'react';
import { SkillsProps } from '../modules/data-types';

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const extraCount = skills.length - 3;
  const [showMore, setShowMore] = useState(false);
  return (
    <Flex gap="3px 3px" wrap="wrap">
      {skills.slice(0, 3).map((skill, index) => {
        return (
          <Tag key={index} color="processing">
            {skill.name}
          </Tag>
        );
      })}
      {!showMore && extraCount > 0 && (
        <Tag
          style={{ cursor: 'pointer' }}
          color="green"
          onClick={() => {
            setShowMore(!showMore);
          }}>
          {' '}
          + {extraCount}{' '}
        </Tag>
      )}

      {showMore &&
        extraCount > 0 &&
        skills.slice(3).map((skill, index) => {
          return (
            <Tag key={index} color="processing">
              {skill.name}
            </Tag>
          );
        })}

      {showMore && extraCount > 0 && (
        <Tag
          style={{ cursor: 'pointer' }}
          color="red"
          onClick={() => {
            setShowMore(!showMore);
          }}>
          {' '}
          -{' '}
        </Tag>
      )}
    </Flex>
  );
};

export default Skills;
