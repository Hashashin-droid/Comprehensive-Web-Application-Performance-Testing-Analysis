import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "1m", target: 50 },    // baseline load
    { duration: "30s", target: 500 },  // sudden spike
    { duration: "1m", target: 50 },    // return to baseline
    { duration: "30s", target: 1000 }, // another spike
    { duration: "1m", target: 0 },     // end
  ],
  thresholds: {
    http_req_duration: ["p(95) < 1000"], // p95 < 1s
    http_req_failed: ["rate < 0.01"],    // error rate < 1%
  },
};

export default function () {
  const res = http.get("https://test.k6.io");
  sleep(1);
}
