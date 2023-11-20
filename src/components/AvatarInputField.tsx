import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

const AvatarInputField = () => {
  const [avatar, setAvatar] = useState('')
  const [isHover, setIsHover] = useState(false)

  const handleAvatarChange = (event: any) => {
    setAvatar(event?.target?.files[0] ? URL.createObjectURL(event.target.files[0]) : '')
  }

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <div className='relative mb-8'>
      <label
        htmlFor='avatar-input'
        className='block w-fit relative hover:cursor-pointer'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar
          alt='Avatar'
          src={avatar}
          sx={{ width: 120, height: 120 }}
          variant='square'
          className={`${isHover ? 'opacity-30' : 'opacity-100'}`}
        />
        <IconButton
          aria-label='upload picture'
          component='span'
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 ${
            isHover ? 'opacity-100' : ''
          }`}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <input accept='image/*' style={{ display: 'none' }} id='avatar-input' type='file' onChange={handleAvatarChange} />
    </div>
  )
}

export default AvatarInputField
