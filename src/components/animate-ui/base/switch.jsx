import React from 'react';
import { Switch as SwitchPrimitives } from '@base-ui-components/react/switch';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Switch({
  className,
  leftIcon,
  rightIcon,
  thumbIcon,
  onCheckedChange,
  motionProps,
  ...props
}) {
  const [isChecked, setIsChecked] = React.useState(
    props?.checked ?? props?.defaultChecked ?? false
  );

  React.useEffect(() => {
    if (props?.checked !== undefined) setIsChecked(props.checked);
  }, [props?.checked]);

  const handleCheckedChange = React.useCallback(
    (checked, event) => {
      setIsChecked(checked);
      onCheckedChange?.(checked, event);
    },
    [onCheckedChange]
  );

  return (
    <SwitchPrimitives.Root
      data-slot='switch'
      {...props}
      onCheckedChange={handleCheckedChange}
      className={cn(
        'peer relative inline-flex p-1 pt-3 pb-3 h-7 w-14 shrink-0 cursor-pointer items-center  rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-blue-100 data-[unchecked]:bg-sky-100 data-[checked]:justify-end data-[unchecked]:justify-start',
        className
      )}
      render={<motion.button whileTap='tap' initial={false} {...motionProps} />}
    >
      {leftIcon && (
        <motion.div
          data-slot='switch-left-icon'
          animate={
            isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 1 }
          }
          transition={{ type: 'spring', bounce: 0 }}
          className='absolute inset-y-0 left-1 flex items-center dark:text-neutral-500 text-neutral-400 [&_svg]:size-3'
        >
          {leftIcon}
        </motion.div>
      )}

      {rightIcon && (
        <motion.div
          data-slot='switch-right-icon'
          animate={
            isChecked ? { scale: 0, opacity: 1 } : { scale: 1, opacity: 1 }
          }
          transition={{ type: 'spring', bounce: 0 }}
          className='absolute inset-y-0 right-1 flex items-center dark:text-neutral-400 text-neutral-500 [&_svg]:size-3'
        >
          {rightIcon}
        </motion.div>
      )}

      <SwitchPrimitives.Thumb
        data-slot='switch-thumb'
        render={
          <motion.div
            className='relative pointer-events-none z-[1] [&_svg]:size-4 flex items-center justify-center rounded-full bg-background shadow-lg ring-0 dark:text-neutral-400 text-neutral-500'
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ width: 20, height: 20 }}
          />
        }
      >
        {thumbIcon}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}

export { Switch };
