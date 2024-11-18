// FilteredByFriend 컴포넌트
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gameFriend } from "@services/apiMyPage";

interface FilteredByFriendProps {
  selectMember: string;
  onMemberChange: (memberId: string) => void;
}

const FriendBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const SelectedProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

const FriendName = styled.span`
  font-family: 'LINESeed';
  font-size: 16px;
  color: #333;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 200px;
  margin-top: 3px;
  margin-left: 5px;
`;

const DropdownButton = styled.button`
  width: 140px;
  height: 35px;
  padding: 8px;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  background-color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  width: 154px;
  top: 43px;
  right: 50px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: calc(100% - 32px);
  padding: 8px;
  margin: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

interface Friend {
  memberId: string;
  memberName: string;
  memberProfileImageUrl: string;
}

const FilteredByFriend: React.FC<FilteredByFriendProps> = ({ selectMember, onMemberChange }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await gameFriend();
        setFriends(response);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };
    fetchFriends();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setSearchTerm(""); // 드롭다운을 열 때마다 검색어 초기화
  };

  const handleFriendSelect = (friend: Friend) => {
    onMemberChange(friend.memberId); // 부모 컴포넌트로 선택된 친구의 ID 전달
    setDropdownOpen(false); // 드롭다운 닫기
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const selectedFriend = friends.find(friend => friend.memberId === selectMember);

  const handleFriendName = (name: string) => {
    return name.length > 5 ? `${name.slice(0, 5)}...` : name;
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedFriend && (
          <SelectedProfileImage
            src={selectedFriend.memberProfileImageUrl}
            alt={selectedFriend.memberName}
          />
        )}
        {selectedFriend ? handleFriendName(selectedFriend.memberName) : "친구를 입력하세요!"}
      </DropdownButton>

      {dropdownOpen && (
        <DropdownContent>
          <SearchInput
            type="text"
            placeholder="친구 이름 검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <FriendBox
                key={friend.memberId}
                onClick={() => handleFriendSelect(friend)}
              >
                <ProfileImage
                  src={friend.memberProfileImageUrl}
                  alt={friend.memberName}
                />
                <FriendName>{handleFriendName(friend.memberName)}</FriendName>
              </FriendBox>
            ))
          ) : (
            <p>친구 목록이 없습니다.</p>
          )}
        </DropdownContent>
      )}
    </DropdownWrapper>
  );
};

export default FilteredByFriend;
