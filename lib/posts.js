import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // ? /posts폴더 내 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // ? id 얻기 위해 확장자명 ".md" 제거
    const id = fileName.replace(/\.md$/, "");

    // ? markdown 파일 스트링으로 읽어오기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    // ? gray-matter로 메타데이타 파싱
    const matterResult = matter(fileContents);

    // ? id랑 데이터 결합
    return {
      id,
      ...matterResult.data
    }
  })

  // ? 날짜별로 posts 정렬
  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  })
}