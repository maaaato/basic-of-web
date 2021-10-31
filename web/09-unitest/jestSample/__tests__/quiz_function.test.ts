import { writeDataInLocal, fetchURL, newConfig } from "../quiz_function";

describe("writeDataInLocal test", () => {
    test('Check normal', () => {
        expect(writeDataInLocal("data")).toBeTruthy();
    });
});

describe("fetchURL test", () => {
    test('Check normal', () => {
        const expected =
        {
        "headers": {
            "Accept": "*/*",
            "Host": "httpbin.org",
            "User-Agent": expect.anything(),
            "X-Amzn-Trace-Id": expect.anything(),
        }
        };

        return fetchURL("https://httpbin.org/headers").then(data =>{
            expect(data).toEqual(expected);
        });
    });
});

describe("Config test", () => {
    test('Check normal', () => {
        const config = newConfig("quiz.yaml");
        expect(config.Cluster).toBe('example');
        expect(config.Service).toBe('example-api');
        expect(config.TaskCount).toBe(2);
    });
});