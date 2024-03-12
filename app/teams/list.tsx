"use client";

import { edenApi } from "@/lib/api";
import { SaveIcon, PlusIcon, DeleteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Team {
  id: number;
  name: string;
  imageUrl: string | null;
  dirty?: boolean;
}

export interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  const [teamData, setTeamData] = useState(teams);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamImageUrl, setNewTeamImageUrl] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    team: Team
  ) => {
    const newData = teamData.map((t) => {
      if (t.id === team.id) {
        return {
          ...t,
          [name]: e.target.value,
          dirty: true,
        };
      }
      return t;
    });
    setTeamData(newData);
  };

  const handleTeamAdd = async () => {
    const { data, error } = await edenApi.api.teams.post({
      name: newTeamName,
      image: newTeamImageUrl,
    });
    if (error) {
      console.error(error);
      return;
    }
    setTeamData([
      ...teamData,
      { id: data.id, name: data.name, imageUrl: data.imageUrl },
    ]);
    setNewTeamName("");
    setNewTeamImageUrl("");
  };

  const handleTeamUpdate = async (team: Team) => {
    if (!team.imageUrl) return;

    const { data, error } = await edenApi.api.teams.post({
      id: team.id,
      name: team.name,
      image: team.imageUrl,
    });
    if (error) {
      console.error(error);
      return;
    }
    setTeamData(
      teamData.map((t) => {
        if (t.id === team.id) {
          return {
            ...t,
            dirty: false,
          };
        }
        return t;
      })
    );
  };

  const handleTeamDelete = async (team: Team) => {
    const { data, error } = await edenApi.api.teams[team.id].delete();
    if (error) {
      console.error(error);
      return;
    }
    setTeamData(teamData.filter((t) => t.id !== team.id));
  };

  return (
    <Table className="container">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>名稱</TableHead>
          <TableHead>圖片網址</TableHead>
          <TableHead className="text-center w-12">動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamData.map((team) => (
          <TableRow key={team.id}>
            <TableCell>
              <Input
                value={team.name}
                onChange={(e) => handleInputChange(e, "name", team)}
              />
            </TableCell>
            <TableCell>
              <Input
                value={team.imageUrl || ""}
                onChange={(e) => handleInputChange(e, "imageUrl", team)}
              />
            </TableCell>
            <TableCell className="flex">
              <Button
                variant={"ghost"}
                className="w-10 p-0"
                disabled={!team.dirty}
                onClick={() => handleTeamUpdate(team)}
              >
                <SaveIcon />
              </Button>
              <Button
                variant={"ghost"}
                className="w-10 p-0"
                onClick={() => handleTeamDelete(team)}
              >
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-green-900">
        <TableRow>
          <TableCell>
            <Input
              value={newTeamName}
              placeholder="新隊伍名稱"
              onChange={(e) => setNewTeamName(e.target.value)}
            ></Input>
          </TableCell>
          <TableCell>
            <Input
              placeholder="新隊伍圖片網址"
              value={newTeamImageUrl}
              onChange={(e) => setNewTeamImageUrl(e.target.value)}
            ></Input>
          </TableCell>
          <TableCell>
            <Button
              variant={"ghost"}
              className="w-10 p-0"
              disabled={!newTeamName || !newTeamImageUrl}
              onClick={handleTeamAdd}
            >
              <PlusIcon />
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
