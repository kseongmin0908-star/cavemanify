const MODEL_URL = "./my_model/";

let model;

// ── Funny result messages ──
// Each tier has multiple messages — one is picked at random each time
const primitiveMessages = [
    {
        min: 90,
        variants: [
            { emoji: "🦴🔥", title: "완벽한 원시인!", desc: "축하합니다! 당신은 100% 순수 원시인입니다. 매머드 사냥은 기본이고, 불 피우기 장인이시죠? 에어컨 없이도 거뜬하고, 날고기도 맛있게 드실 수 있는 분입니다. 동굴 부동산에 관심 있으시면 연락주세요. 🏔️" },
            { emoji: "🦣💪", title: "전설의 원시 전사!", desc: "호랑이도 당신을 보면 도망갑니다. 맨손으로 바위를 깨고, 맨발로 산을 넘는 당신! 현대인들이 헬스장에서 땀 흘릴 때, 당신은 매머드를 쫓고 있을 타입입니다. 구석기 올림픽 금메달 감이에요. 🏆" },
            { emoji: "🔥🪨", title: "동굴 속 절대 권력자!", desc: "당신이 살던 동굴은 분명 명당이었을 겁니다. 불 피우는 속도 세계 신기록, 사냥 성공률 100%. 원시시대 부동산 재벌이셨을 가능성이 높습니다. 현대에 태어난 게 아쉬울 정도예요. 🏠" },
            { emoji: "🍖🦴", title: "타고난 야생 본능!", desc: "도시에 살고 있지만 당신의 DNA는 완전히 야생입니다. 편의점 앞에서도 사냥 본능이 발동하고, 바비큐 할 때 불 조절은 본능적으로 완벽합니다. 정글에 떨어져도 3일 안에 왕국 건설 가능! 🌿" },
            { emoji: "⚔️🦏", title: "원시 시대의 인플루언서!", desc: "구석기 시대에 SNS가 있었다면 당신은 팔로워 100만 확정이었습니다. '오늘의 사냥 전리품 인증' '동굴 인테리어 꿀팁' 같은 콘텐츠로 원시인계의 탑 크리에이터가 되었을 거예요. 🎬" }
        ]
    },
    {
        min: 70,
        variants: [
            { emoji: "🪨🍖", title: "거의 원시인!", desc: "당신은 사냥을 잘하고 덜 익힌 음식도 거뜬히 먹을 수 있을 것입니다. 돌도끼를 다루는 솜씨가 예사롭지 않으시네요. 현대 사회에서 살고 있지만, 영혼은 구석기 시대에 있습니다. 🦣" },
            { emoji: "🌋🏃", title: "생존왕 후보!", desc: "무인도 서바이벌 프로그램에 나가면 우승 후보 1순위입니다. 불 피우기, 물 구하기, 집 짓기... 전부 본능적으로 해내실 분! 다만 핸드폰 충전은 좀 어려울 수 있어요. 🏝️" },
            { emoji: "🦁🛡️", title: "원시인 정신 계승자!", desc: "현대 문명 속에서도 원시인의 정신을 잃지 않는 당신! 회의실에서도 사냥꾼의 눈빛이 빛나고, 점심시간엔 누구보다 빠르게 맛집을 선점합니다. 현대판 원시 전략가! 📋" },
            { emoji: "🏔️🔥", title: "도시 속 원시인!", desc: "겉으로는 현대인이지만, 캠핑장만 가면 본모습이 드러납니다. 장작 패기에 남다른 재능이 있고, 고기 굽는 실력은 미슐랭 급! 자연 속에서 당신은 진정한 자유를 느끼는 사람입니다. 🏕️" }
        ]
    },
    {
        min: 50,
        variants: [
            { emoji: "🏕️", title: "원시인 성향 우세!", desc: "캠핑을 좋아하시죠? 자연에서 살아남는 능력이 남다릅니다. 와이파이 없는 곳에서도 꿋꿋이 버틸 수 있는 강인한 정신력의 소유자! 다만 가끔 스마트폰이 그리울 수 있습니다. 🌲" },
            { emoji: "🌄🍃", title: "반쯤 야생인!", desc: "에어컨 빵빵한 사무실도 좋지만, 마음 한켠에는 항상 자연이 있습니다. 주말마다 산으로 바다로 떠나고 싶은 당신, 원시인의 피가 조금 더 진하게 흐르고 있네요! 🚗" },
            { emoji: "🪵🌙", title: "아날로그 감성 보유자!", desc: "디지털보다 아날로그가 편한 당신. 캠프파이어 앞에서 이야기하는 걸 좋아하고, 가끔은 스마트폰을 꺼두고 싶은 충동이 밀려옵니다. 원시인 DNA가 슬슬 깨어나고 있어요! 🌌" }
        ]
    }
];

const modernMessages = [
    {
        min: 90,
        variants: [
            { emoji: "💻📱", title: "완벽한 현대인!", desc: "당신은 와이파이가 끊기면 생존이 불가능한 완벽한 현대인입니다. 배달앱 없이는 못 살고, 걷기보다 킥보드를 선호하시죠? 동굴에 가면 5분 안에 울 것 같습니다. 충전기를 항상 챙기세요! 🔋" },
            { emoji: "🤖✨", title: "디지털 네이티브 그 자체!", desc: "태어날 때부터 스마트폰을 들고 나온 것 같은 당신! AI한테 말 거는 게 사람한테보다 편하고, 현금이 뭔지 까먹은 지 오래입니다. 원시인을 만나면 '충전기 어딨어요?'라고 물어볼 사람. ⚡" },
            { emoji: "📱💳", title: "문명의 최종 진화체!", desc: "로봇청소기, 에어프라이어, 스마트워치... 기술 없이는 하루도 못 사는 당신! 원시시대에 태어났으면 첫째 날 '이건 아닌데...'하고 타임머신을 발명했을 겁니다. 미래에서 온 사람 아니세요? 🚀" },
            { emoji: "🎧🛒", title: "21세기형 프로 도시인!", desc: "아침에 눈 뜨면 스마트폰 확인, 출근은 앱으로 택시 호출, 점심은 배달앱, 퇴근 후엔 넷플릭스. 이 루틴이 깨지면 멘붕 오는 당신은 현대 문명 없이 24시간도 버틸 수 없습니다! 📺" },
            { emoji: "🧬💻", title: "테크 의존증 말기!", desc: "스마트폰 배터리 1%에 심장이 멎는 사람, 바로 당신입니다. 엘리베이터 고장나면 그날 출근 포기, 에어컨 없으면 여름에 용해됩니다. 원시인이 보면 '어떻게 살아있지?' 할 레벨! 😵" }
        ]
    },
    {
        min: 70,
        variants: [
            { emoji: "🧑‍💻☕", title: "거의 현대인!", desc: "카페에서 노트북 펼치는 게 일상인 당신! 원시시대에 태어났다면 첫날에 리타이어했을 것입니다. 불 피우기는 유튜브 보고 배우면 되니까요. 당신의 무기는 돌도끼가 아니라 키보드입니다. ⌨️" },
            { emoji: "🏢🍜", title: "도시 적응 만렙!", desc: "지하철 환승은 눈 감고도 가능하고, 맛집 리스트는 항상 업데이트 중. 자연? 인스타 필터로 충분합니다. 당신에게 '야생'이란 금요일 저녁 홍대 거리가 전부예요. 🌃" },
            { emoji: "📲🎯", title: "디지털 생존 전문가!", desc: "앱스토어 인기 앱은 전부 깔려있고, 새 기능 업데이트는 당일 설치. 기술 트렌드는 누구보다 빠르게 캐치하지만, 모기 한 마리에 온 집안이 난리가 됩니다. 🦟" },
            { emoji: "🏙️📡", title: "편의점이 고향인 사람!", desc: "편의점 삼각김밥의 모든 맛을 꿰고 있고, 무인매장 키오스크는 원어민급. 당신에게 '생존'이란 스마트폰 충전기와 카드만 있으면 되는 겁니다! 💳" }
        ]
    },
    {
        min: 50,
        variants: [
            { emoji: "🏙️", title: "현대인 성향 우세!", desc: "문명의 혜택을 사랑하지만, 가끔은 자연이 그리운 당신. 캠핑은 가고 싶지만 글램핑만 OK. 벌레는 절대 안 되고, 에어컨은 필수. 원시인의 DNA가 살짝 남아있긴 합니다... 아주 살짝. 🏕️" },
            { emoji: "🛋️📺", title: "소파 위의 현대인!", desc: "주말엔 소파가 내 집이고, 리모컨이 내 무기. 밖에 나가는 건 배달이 안 될 때뿐! 하지만 가끔 선선한 바람이 불면 '산책이나 할까...' 하다가 넷플릭스를 켭니다. 🍿" },
            { emoji: "☕🗺️", title: "문명 애호가!", desc: "따뜻한 카페라떼 한 잔이면 행복한 당신. 자연은 카페 창밖으로 보는 것만으로 충분합니다. 원시인 DNA가 아주 약하게 남아있어서, 1년에 한 번 캠핑 사진은 올려줍니다. 📸" }
        ]
    }
];

const balancedMessages = [
    { emoji: "⚖️🤔", title: "반반! 하이브리드 인간!", desc: "당신은 원시인과 현대인의 완벽한 균형! 한 손에는 스마트폰, 다른 손에는 돌도끼를 들고 있는 느낌이랄까요. 캠핑도 좋아하고 와이파이도 사랑하는, 시대를 초월한 존재입니다. 🌍" },
    { emoji: "🔀🧬", title: "시대 혼종 인간!", desc: "아침엔 현대인, 저녁엔 원시인. 낮에는 카페에서 코딩하다가, 밤에는 캠프파이어 앞에서 고기를 굽습니다. 어느 시대에 태어나도 적응할 수 있는 만능 인간이에요! 🌗" },
    { emoji: "🎭🌀", title: "시간여행자 의심!", desc: "원시시대와 현대를 자유롭게 오가는 당신, 혹시 타임머신 가지고 계신 거 아니죠? 돌도끼도 다룰 줄 알고 앱도 잘 쓰는 이 밸런스, 범상치 않습니다. 시간여행자 출석체크! 🕰️" }
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getResultMessage(predictions) {
    let primitiveProb = 0;
    let modernProb = 0;

    for (const p of predictions) {
        const name = p.className.toLowerCase();
        if (name.includes('원시') || name.includes('primitive')) {
            primitiveProb = p.probability * 100;
        } else if (name.includes('현대') || name.includes('modern')) {
            modernProb = p.probability * 100;
        }
    }

    // If very close
    if (Math.abs(primitiveProb - modernProb) < 10) {
        return { ...pickRandom(balancedMessages), type: 'balanced', primitiveProb, modernProb };
    }

    if (primitiveProb > modernProb) {
        const tiers = primitiveMessages.filter(m => primitiveProb >= m.min);
        const tier = tiers[0] || primitiveMessages[primitiveMessages.length - 1];
        const variant = pickRandom(tier.variants);
        return { ...variant, type: 'primitive', primitiveProb, modernProb };
    } else {
        const tiers = modernMessages.filter(m => modernProb >= m.min);
        const tier = tiers[0] || modernMessages[modernMessages.length - 1];
        const variant = pickRandom(tier.variants);
        return { ...variant, type: 'modern', primitiveProb, modernProb };
    }
}

let lastResult = null;

// ── Toast ──
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Result Card Generation (Canvas with user image) ──
function generateResultCard() {
    if (!lastResult) return Promise.resolve(null);

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(buildCanvas(img));
        img.onerror = () => resolve(buildCanvas(null));
        img.src = previewImage.src;
    });
}

function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let remaining = text;
    while (remaining.length > 0) {
        let lineEnd = remaining.length;
        while (ctx.measureText(remaining.substring(0, lineEnd)).width > maxWidth && lineEnd > 1) {
            lineEnd--;
        }
        // Try to break at a space if we cut in the middle
        if (lineEnd < remaining.length && lineEnd > 1) {
            const spaceIdx = remaining.lastIndexOf(' ', lineEnd);
            if (spaceIdx > 0) lineEnd = spaceIdx + 1;
        }
        lines.push(remaining.substring(0, lineEnd).trim());
        remaining = remaining.substring(lineEnd).trim();
    }
    return lines;
}

function buildCanvas(userImg) {
    const W = 600;
    const pad = 40;
    const contentW = W - pad * 2;

    // Pre-calculate description height
    const tmpCanvas = document.createElement('canvas');
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.font = '15px "Noto Sans KR", sans-serif';
    const descLines = wrapText(tmpCtx, lastResult.desc, contentW - 20);
    const descBlockH = descLines.length * 24 + 28;

    // Layout Y positions
    const topTitleY = 42;
    const imgSize = 280;
    const imgY = 62;
    const emojiY = imgY + imgSize + 50;
    const titleY = emojiY + 48;
    const descY = titleY + 24;
    const barStartY = descY + descBlockH + 20;
    const urlY = barStartY + 120;
    const H = urlY + 30;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#1a1028');
    bgGrad.addColorStop(0.5, '#2a1a42');
    bgGrad.addColorStop(1, '#1a1028');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Outer border
    ctx.strokeStyle = 'rgba(199, 125, 255, 0.3)';
    ctx.lineWidth = 2;
    roundRect(ctx, 2, 2, W - 4, H - 4, 14);
    ctx.stroke();

    // Top title
    ctx.font = '18px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#a090c0';
    ctx.textAlign = 'center';
    ctx.fillText('🦣 원시인 vs 현대인 판별기', W / 2, topTitleY);

    // User image (large rounded rectangle)
    const imgX = (W - imgSize) / 2;
    if (userImg) {
        ctx.save();
        roundRect(ctx, imgX, imgY, imgSize, imgSize, 24);
        ctx.clip();
        const scale = Math.max(imgSize / userImg.width, imgSize / userImg.height);
        const sw = imgSize / scale;
        const sh = imgSize / scale;
        const sx = (userImg.width - sw) / 2;
        const sy = (userImg.height - sh) / 2;
        ctx.drawImage(userImg, sx, sy, sw, sh, imgX, imgY, imgSize, imgSize);
        ctx.restore();
        ctx.strokeStyle = 'rgba(199, 125, 255, 0.4)';
        ctx.lineWidth = 2;
        roundRect(ctx, imgX, imgY, imgSize, imgSize, 24);
        ctx.stroke();
    }

    // Result emoji
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lastResult.emoji, W / 2, emojiY);

    // Result title
    const titleColor = lastResult.type === 'primitive' ? '#ff6b35'
        : lastResult.type === 'modern' ? '#00d4aa' : '#c77dff';
    ctx.font = 'bold 26px "Noto Sans KR", sans-serif';
    ctx.fillStyle = titleColor;
    ctx.fillText(lastResult.title, W / 2, titleY);

    // Description background box
    const descBoxColor = lastResult.type === 'primitive' ? 'rgba(255, 107, 53, 0.1)'
        : lastResult.type === 'modern' ? 'rgba(0, 212, 170, 0.1)' : 'rgba(199, 125, 255, 0.08)';
    const descBorderColor = lastResult.type === 'primitive' ? 'rgba(255, 107, 53, 0.25)'
        : lastResult.type === 'modern' ? 'rgba(0, 212, 170, 0.25)' : 'rgba(199, 125, 255, 0.2)';
    ctx.fillStyle = descBoxColor;
    roundRect(ctx, pad, descY, contentW, descBlockH, 12);
    ctx.fill();
    ctx.strokeStyle = descBorderColor;
    ctx.lineWidth = 1;
    roundRect(ctx, pad, descY, contentW, descBlockH, 12);
    ctx.stroke();

    // Description text
    const descTextColor = lastResult.type === 'primitive' ? '#ffb899'
        : lastResult.type === 'modern' ? '#80eed5' : '#d0c0e8';
    ctx.font = '15px "Noto Sans KR", sans-serif';
    ctx.fillStyle = descTextColor;
    ctx.textAlign = 'left';
    descLines.forEach((line, i) => {
        ctx.fillText(line, pad + 10, descY + 22 + i * 24);
    });

    // Percentage bars
    const barX = 80;
    const barW = 320;
    const barH = 16;
    drawBar(ctx, barX, barStartY, barW, barH, '🦴 원시인', lastResult.primitiveProb, '#ff6b35', '#ff9f75');
    drawBar(ctx, barX, barStartY + 50, barW, barH, '💻 현대인', lastResult.modernProb, '#00d4aa', '#40ffd0');

    // Site URL
    ctx.font = '15px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#c77dff';
    ctx.textAlign = 'center';
    ctx.fillText('🔗 cavemanify1.pages.dev', W / 2, urlY);

    return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

function drawBar(ctx, barX, barY, barW, barH, label, value, color1, color2) {
    ctx.font = '14px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f0e8ff';
    ctx.fillText(label, barX, barY - 6);
    ctx.textAlign = 'right';
    ctx.fillText(value.toFixed(1) + '%', barX + barW + 60, barY - 6);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    roundRect(ctx, barX, barY, barW, barH, 8);
    ctx.fill();

    const fillW = Math.max(barW * (value / 100), 0);
    if (fillW > 0) {
        const grad = ctx.createLinearGradient(barX, 0, barX + fillW, 0);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        ctx.fillStyle = grad;
        const r = Math.min(8, fillW / 2);
        roundRect(ctx, barX, barY, fillW, barH, r);
        ctx.fill();
    }
}

// ── Save Result (download image) ──
async function saveResult() {
    const canvas = await generateResultCard();
    if (!canvas) return;

    try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const dataUrl = canvas.toDataURL('image/png');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // 1) Mobile: try Web Share API (갤러리 저장 가능)
        if (isMobile && navigator.share && navigator.canShare) {
            try {
                const file = new File([blob], 'caveman-result.png', { type: 'image/png' });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({ files: [file] });
                    return;
                }
            } catch (e) {
                if (e.name === 'AbortError') return;
                // Share failed, fall through
            }
        }

        // 2) Mobile fallback: 새 탭에 이미지를 열어서 길게 눌러 저장
        if (isMobile) {
            const newTab = window.open('', '_blank');
            if (newTab) {
                newTab.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>결과 저장</title>
                        <style>
                            body { margin: 0; background: #1a1028; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
                            img { max-width: 95%; height: auto; border-radius: 12px; }
                            p { color: #c77dff; margin-top: 16px; font-size: 15px; text-align: center; padding: 0 20px; }
                        </style>
                    </head>
                    <body>
                        <img src="${dataUrl}" alt="결과">
                        <p>📲 이미지를 길게 눌러서 갤러리에 저장하세요!</p>
                    </body>
                    </html>
                `);
                newTab.document.close();
                showToast('📲 이미지를 길게 눌러 저장하세요!');
                return;
            }
        }

        // 3) Desktop: 다운로드
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'caveman-result.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast('📥 결과 이미지가 다운로드되었습니다!');
    } catch (err) {
        showToast('저장에 실패했습니다. 다시 시도해주세요.');
    }
}

// ── Clipboard fallback using textarea (works on all browsers) ──
function copyToClipboardFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(textarea);
    return ok;
}

// ── Share Link ──
async function shareLink() {
    const siteUrl = 'https://cavemanify1.pages.dev';

    // 1) 네이티브 공유 시트 먼저 시도 (유저 제스처 필요 — 다른 작업 전에 즉시 호출)
    if (navigator.share) {
        try {
            await navigator.share({
                title: '원시인 vs 현대인 판별기',
                text: '나는 원시인일까 현대인일까? AI 테스트 해봐! 🦣',
                url: siteUrl
            });
            // 공유 시트에서 공유 완료 — 클립보드도 복사해두기
            copyToClipboardFallback(siteUrl);
            return;
        } catch (e) {
            if (e.name === 'AbortError') {
                // 사용자가 취소 — 클립보드에는 복사해두기
                copyToClipboardFallback(siteUrl);
                showToast('✅ 링크가 클립보드에 복사되었습니다!');
                return;
            }
            // 그 외 에러 — 공유 시트 실패, 아래 클립보드 복사로 이동
        }
    }

    // 2) 공유 시트 미지원 또는 실패 시 클립보드 복사
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(siteUrl);
            showToast('✅ 링크가 클립보드에 복사되었습니다!');
            return;
        } catch (e) { /* fall through */ }
    }

    if (copyToClipboardFallback(siteUrl)) {
        showToast('✅ 링크가 클립보드에 복사되었습니다!');
    } else {
        showToast('링크 복사에 실패했습니다. 직접 복사해주세요: ' + siteUrl);
    }
}

// ── DOM Elements ──
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const previewImage = document.getElementById('preview-image');
const analyzeBtn = document.getElementById('analyze-btn');
const retryBtn = document.getElementById('retry-btn');
const resultContainer = document.getElementById('result-container');
const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const labelContainer = document.getElementById('label-container');
const loading = document.getElementById('loading');
const saveBtn = document.getElementById('save-btn');
const shareLinkBtn = document.getElementById('share-link-btn');

saveBtn.addEventListener('click', saveResult);
shareLinkBtn.addEventListener('click', shareLink);

// ── Upload Handling ──
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.classList.remove('hidden');
        uploadPlaceholder.classList.add('hidden');
        analyzeBtn.classList.remove('hidden');
        retryBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

// ── Analyze ──
analyzeBtn.addEventListener('click', async () => {
    analyzeBtn.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        if (!model) {
            const modelURL = MODEL_URL + "model.json";
            const metadataURL = MODEL_URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
        }

        const predictions = await model.predict(previewImage);

        // Build bars
        labelContainer.innerHTML = '';
        for (const p of predictions) {
            const percent = (p.probability * 100).toFixed(1);
            const name = p.className;
            const nameLower = name.toLowerCase();
            let barClass = 'prediction-bar';
            if (nameLower.includes('원시') || nameLower.includes('primitive')) {
                barClass += ' primitive';
            } else if (nameLower.includes('현대') || nameLower.includes('modern')) {
                barClass += ' modern';
            }

            const barDiv = document.createElement('div');
            barDiv.className = barClass;
            barDiv.innerHTML = `
                <div class="label-row">
                    <span>${name}</span>
                    <span>${percent}%</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: 0%"></div>
                </div>
            `;
            labelContainer.appendChild(barDiv);

            // Animate bar after append
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    barDiv.querySelector('.bar-fill').style.width = percent + '%';
                });
            });
        }

        // Get funny message
        const msg = getResultMessage(predictions);
        lastResult = msg;
        resultEmoji.textContent = msg.emoji;
        resultTitle.textContent = msg.title;
        resultTitle.className = 'result-title ' + (msg.type === 'balanced' ? 'modern' : msg.type);
        resultDesc.textContent = msg.desc;
        resultDesc.className = 'result-desc ' + (msg.type === 'balanced' ? '' : msg.type);

        loading.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        retryBtn.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        analyzeBtn.classList.remove('hidden');
        alert('분석에 실패했습니다. 모델 파일을 확인해주세요.\n' + err.message);
    }
});

// ── Retry ──
retryBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewImage.src = '';
    previewImage.classList.add('hidden');
    uploadPlaceholder.classList.remove('hidden');
    analyzeBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');
    resultContainer.classList.add('hidden');
    lastResult = null;
});


