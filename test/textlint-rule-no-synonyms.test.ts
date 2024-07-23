import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-no-synonyms";
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-synonyms", rule, {
    valid: [
        "新参入、借り入れ、問題のパスポート、マネー、雇入 片方のペアだけならOKです",
        "インターフェースとインターフェースは同じなのでOK",
        "This is アーカイブ",
        // allowAlphabet: true
        // item.hyoukiYure === "アルファベット表記"
        "blogはブログです",
        // allowNumber: true
        "1は数字の一種です",
        // item.ryakusyou === "略語・略称/アルファベット"
        "「データベース」「DB」",
        // allow links by default
        `「[インターフェース](https://example.com)」と「[インタフェース](https://example.com)」`,
        // "allows
        {
            text: `ウェブアプリとウェブアプリケーションの違いは許容する`,
            options: {
                allows: ["ウェブアプリ"] // <= 片方が許可されていればOK
            }
        },
        // preferWords
        {
            text: `ユーザーだけに統一されていればユーザーは許容する`,
            options: {
                preferWords: ["ユーザー"]
            }
        },
        // allowLexeme
        {
            text: "部屋の同義語はルームです",
            options: {
                allowLexeme: true
            }
        },
        {
            text: "部屋の英語はroomです",
            options: {
                allowLexeme: false,
                allowAlphabet: true
            }
        },
        {
            text: "部屋の英語はroomです",
            options: {
                allowLexeme: false,
                allowAlphabet: false,
                allows: ["部屋"] // <= 片方が許可されていればOK
            }
        }
    ],
    invalid: [
        {
            text: "サーバとサーバーの表記揺れがある",
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「サーバ」と「サーバー」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 3],
                        text: "サーバ"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「サーバ」と「サーバー」が利用されています",
                    index: 4,
                    line: 1,
                    column: 5,
                    severity: 2,
                    fix: {
                        range: [4, 8],
                        text: "サーバ"
                    }
                }
            ]
        },
        {
            text: "この雇入と雇入れの違いは難しい問題だ",
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「雇入」と「雇入れ」が利用されています",
                    index: 2,
                    line: 1,
                    column: 3,
                    severity: 2,
                    fix: {
                        range: [2, 4],
                        text: "雇入"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「雇入」と「雇入れ」が利用されています",
                    index: 5,
                    line: 1,
                    column: 6,
                    severity: 2,
                    fix: {
                        range: [5, 8],
                        text: "雇入"
                    }
                }
            ]
        },
        {
            text: "blogはブログです",
            options: {
                allowAlphabet: false
            },
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「blog」と「ブログ」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 4],
                        text: "blog"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「blog」と「ブログ」が利用されています",
                    index: 5,
                    line: 1,
                    column: 6,
                    severity: 2,
                    fix: {
                        range: [5, 8],
                        text: "blog"
                    }
                }
            ]
        },
        {
            text: "1は数字の一種です",
            options: {
                allowNumber: false
            },
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「1」と「一」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 1],
                        text: "1"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「1」と「一」が利用されています",
                    index: 5,
                    line: 1,
                    column: 6,
                    severity: 2,
                    fix: {
                        range: [5, 6],
                        text: "1"
                    }
                }
            ]
        },
        {
            text: "部屋のカタカナ英語はルームです",
            options: {
                allowLexeme: false
            },
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「部屋」と「ルーム」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 2],
                        text: "部屋"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「部屋」と「ルーム」が利用されています",
                    index: 10,
                    line: 1,
                    column: 11,
                    severity: 2,
                    fix: {
                        range: [10, 13],
                        text: "部屋"
                    }
                }
            ]
        },
        {
            text: "部屋の英語はroomです",
            options: {
                allowAlphabet: false,
                allowLexeme: false
            },
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「部屋」と「room」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 2],
                        text: "部屋"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「部屋」と「room」が利用されています",
                    index: 6,
                    line: 1,
                    column: 7,
                    severity: 2,
                    fix: {
                        range: [6, 10],
                        text: "部屋"
                    }
                }
            ]
        },
        {
            text: "ユーザーは許可しユーザはエラー。allowAlphabetがtrueならuserはエラーにならない",
            output: "ユーザーは許可しユーザーはエラー。allowAlphabetがtrueならuserはエラーにならない",
            options: {
                preferWords: ["ユーザー"]
            },
            errors: [
                {
                    message: "「ユーザー」の同義語である「ユーザ」が利用されています",
                    index: 8
                }
            ]
        },
        {
            text: "ユーザーは許可しallowAlphabetがfalseならユーザもuserもエラー",
            output: "ユーザーは許可しallowAlphabetがfalseならユーザーもユーザーもエラー",
            options: {
                preferWords: ["ユーザー"],
                allowAlphabet: false
            },
            errors: [
                {
                    message: "「ユーザー」の同義語である「ユーザ」が利用されています",
                    index: 29
                },
                {
                    message: "「ユーザー」の同義語である「user」が利用されています",
                    index: 33
                }
            ]
        },
        {
            text: "ユーザはエラー",
            output: "ユーザーはエラー",
            options: {
                preferWords: ["ユーザー"]
            },
            errors: [
                {
                    message: "「ユーザー」の同義語である「ユーザ」が利用されています",
                    index: 0
                }
            ]
        },
        {
            text: "ルームは許可しallowLexemeがfalseなら部屋もエラー",
            output: "ルームは許可しallowLexemeがfalseならルームもエラー",
            options: {
                preferWords: ["ルーム"],
                allowLexeme: false
            },
            errors: [
                {
                    message: "「ルーム」の同義語である「部屋」が利用されています",
                    index: 26
                }
            ]
        },
        {
            text: "サーバとサーバーの表記揺れがある。この雇入と雇入れの違いは難しい問題だ。",
            output: "サーバとサーバの表記揺れがある。この雇入と雇入の違いは難しい問題だ。",
            errors: [
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「サーバ」と「サーバー」が利用されています",
                    index: 0,
                    line: 1,
                    column: 1,
                    severity: 2,
                    fix: {
                        range: [0, 3],
                        text: "サーバ"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「サーバ」と「サーバー」が利用されています",
                    index: 4,
                    line: 1,
                    column: 5,
                    severity: 2,
                    fix: {
                        range: [4, 8],
                        text: "サーバ"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「雇入」と「雇入れ」が利用されています",
                    index: 19,
                    line: 1,
                    column: 20,
                    severity: 2,
                    fix: {
                        range: [19, 21],
                        text: "雇入"
                    }
                },
                {
                    type: "lint",
                    ruleId: "textlint-rule-no-synonyms",
                    message: "同義語である「雇入」と「雇入れ」が利用されています",
                    index: 22,
                    line: 1,
                    column: 23,
                    severity: 2,
                    fix: {
                        range: [22, 25],
                        text: "雇入"
                    }
                }
            ]
        }
    ]
});
