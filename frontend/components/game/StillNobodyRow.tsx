'use client';

interface StillNobodyRowProps {
  num: number;
}

export default function StillNobodyRow({ num }: StillNobodyRowProps) {
  return (
    <tr className="bg-green-100/20" key={num}>
      <td className="text-center"></td>
      <td className="text-center text-white">Jeszcze nikogo nie ma? 🤨</td>
      <td className="text-center"></td>
    </tr>
  );
}
