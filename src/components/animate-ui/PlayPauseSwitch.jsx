import { CirclePlay, CirclePause } from 'lucide-react';
import { Switch } from './base/switch';

export const PlayPauseSwitch = ({
  isPlaying,
  onToggle,
  leftIcon = true,
  rightIcon = true,
  thumbIcon = true
}) => {
  const ThumbIcon = isPlaying ? <CirclePause /> : <CirclePlay />;

  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='switch-play'
        checked={isPlaying}
        onCheckedChange={onToggle}
        leftIcon={leftIcon ? <CirclePlay /> : null}
        rightIcon={rightIcon ? <CirclePause /> : null}
        thumbIcon={thumbIcon ? ThumbIcon : null}
      />
    </div>
  );
};
