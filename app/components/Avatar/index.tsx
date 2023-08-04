'use client'

import { User } from "@prisma/client"
import useActiveList from "@/app/hooks/useActiveList"
import Image from "next/image"

import './styles.scss'

interface AvatarProps {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className="avatar">
      <div className="avatar--card rounded-full md:h-11 md:w-11">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={user?.image || '/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <span 
          className="avatar--ring rounded-full 
            bg-green-500 
            ring-2 
            ring-white
            md:h-3 
            md:w-3
          " 
        />
      ) : null}
    </div>
  );
}

export default Avatar