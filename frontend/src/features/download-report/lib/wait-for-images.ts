// 노드 안 모든 <img>가 로드 완료될 때까지 대기 (에러도 통과). 최초 렌더 직후 캡처 시 레이아웃 붕괴 방지.
export const waitForImages = (node: HTMLElement) =>
    Promise.all(
        Array.from(node.querySelectorAll("img")).map((img) =>
            img.complete && img.naturalWidth
                ? Promise.resolve()
                : new Promise<void>((res) => {
                    img.onload = img.onerror = () => res();
                })
        )
    );
