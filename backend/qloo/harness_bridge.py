import subprocess
import json
import shutil
from typing import Dict, Any, List, Optional


class PythonQlooHarnessBridge:
    def __init__(self):
        self.qloo_cmd = shutil.which("qloo") or "npx"

    def is_harness_installed(self) -> bool:
        try:
            cmd = ["npx", "qloo", "--version"] if self.qloo_cmd == "npx" else [self.qloo_cmd, "--version"]
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=5, shell=True)
            return res.returncode == 0
        except Exception:
            return False

    def api_search(self, query: str, limit: int = 5) -> Optional[Dict[str, Any]]:
        """
        Calls official `qloo api search --query "..." --json` method
        """
        try:
            cmd = (
                ["npx", "qloo", "api", "search", "--query", query, "--take", str(limit), "--json"]
                if self.qloo_cmd == "npx"
                else [self.qloo_cmd, "api", "search", "--query", query, "--take", str(limit), "--json"]
            )
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=6, shell=True)
            if res.returncode == 0 and res.stdout.strip():
                return json.loads(res.stdout)
        except Exception:
            pass
        return None

    def exec_workflow(self, workflow_name: str, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Calls official `qloo exec <workflow>` method
        """
        try:
            cmd = (
                ["npx", "qloo", "exec", workflow_name]
                if self.qloo_cmd == "npx"
                else [self.qloo_cmd, "exec", workflow_name]
            )
            res = subprocess.run(
                cmd,
                input=json.dumps(payload),
                capture_output=True,
                text=True,
                timeout=8,
                shell=True
            )
            if res.returncode == 0 and res.stdout.strip():
                return json.loads(res.stdout)
        except Exception:
            pass
        return None


qloo_harness = PythonQlooHarnessBridge()
